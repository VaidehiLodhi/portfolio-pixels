import { TextMarquee } from "@/components/text-marquee"
import { BookmarkStack } from "./bookmark-stack"
import { GuestCheck } from "./guest-check"
import { MessageMeBlock } from "./message-me-block"

export const FooterBlock =()=> {
    return (
        <div className="grid grid-cols-2 min-h-screen bg-[#FAB5C5]">
            <div className="col-start-1 flex items-center justify-center gap-x-20 relative">
                <div className="-translate-y-20 rotate-[-13.55deg]">
                    <GuestCheck/>
                </div>
                <div className="translate-x-3 translate-y-10">
                    <BookmarkStack/>
                </div>
            </div>
            <div className="col-start-2">
                <MessageMeBlock/>
            </div>
            <div className="col-start-1 col-span-2">
                <TextMarquee outline={true} bgColor="#FAB5C5" />
            </div>
        </div>
    )
}