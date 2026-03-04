"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function Dialog({
  modal=true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay className="overflow-y-auto">
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative top-10 left-1/2 -translate-x-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
            className,
          )}
          {...props}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

// 1. stack all slides panels vertically in a tall wrapper
// 2. the outer container is overflow: hidden - no native scroll is possible
// 3. lenis intercepts wheel events, accumulates a targetY, lerps currentY toward it each RAF frame
// 4. apply the position as transform: translateY(-currentY px) on tall wrapper
// 5. to make it horizontal, we rotate the outer container rotate(90deg) and counter rotate each child -rotate(90deg) so content stays upright - exactly what unseen.co does


function ImgDialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const currentY = React.useRef(0);
  const targetY = React.useRef(0);
  const rafRef = React.useRef<number>(0);
  const LERP_FACTOR = 0.08; 
  
 React.useEffect(() => {
   // lock body
   const originalOverflow = document.body.style.overflow;
   //document.body.style.overflow = "hidden";

   // calculate max scroll
   const getMaxScroll = () => {
     const el = scrollContainerRef.current;
     if (!el) return 0;
     return el.scrollHeight - window.innerHeight;
   };

   // RAF loop : lerp currentY toward targetY each frame
   const tick = () => {
     const diff = targetY.current - currentY.current;
     if (Math.abs(diff) < 0.01) {
       currentY.current = targetY.current;
     } else {
       currentY.current += diff * LERP_FACTOR;
     }

     if (scrollContainerRef.current) {
       scrollContainerRef.current.style.transform = `translateY(${-currentY.current}px)`;
     }
     rafRef.current = requestAnimationFrame(tick);
   };
   rafRef.current = requestAnimationFrame(tick);

   // wheel handler : accumulate into targetY
   const handleWheel = (e: WheelEvent) => {
     e.preventDefault();
     const max = getMaxScroll();
     targetY.current = Math.max(
       0,
       Math.min(targetY.current + e.deltaY * 1.2, max),
     );
   };

   window.addEventListener("wheel", handleWheel, { passive: false });

   return () => {
     document.body.style.overflow = originalOverflow;
     window.removeEventListener("wheel", handleWheel);
     cancelAnimationFrame(rafRef.current);
     currentY.current = 0;
     targetY.current = 0;
   };
 }, []);

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay/>
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          `
          bg-[#F5E1CD]
          fixed top-0 left-0 z-50
          h-screen w-screen
          overflow-hidden
          p-6
          rounded-[10px]
          border shadow-lg
          outline-none
          `,
          className,
        )}
        {...props}
      >
        {/* 
          Viewport: rotated 90deg clockwise.
          "down" on screen now points "right" visually.
          We give it the same dimensions as thes creen but rotated.
        */}
        <div
          className="absolute"
          style={{
            width: '100vh',
            height: '100vw',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            transformOrigin: 'center center',
          }}
        >
          {/*
            The track: tall enough to hold all slides.
            translateY is what Lenis will drive.
          */}
          <div
            ref={scrollContainerRef}
            className="flex flex-col will-change-transform"
            style={{
              transform: 'translateY(0px)'
            }}
          >
            {/* each child needs to be counter-rotated */}
            {React.Children.map(children, (child) => (
              <div
                style={{
                  width: '100vh',
                  height: '100vw',
                  transform: 'rotate(90deg)',
                  transformOrigin: 'center center',
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="
              absolute top-4 right-4
              opacity-70 hover:opacity-100
              transition-opacity
            "
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  ImgDialogContent,
}
