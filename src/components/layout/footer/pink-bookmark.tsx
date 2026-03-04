import Image from "next/image"

export const PinkBookmark =()=> {
    return (
        <div className="relative rounded-[10px] h-full w-full bg-[#DF4346] overflow-visible">
            <Image
                src="/imgs/footer/pink_thread.svg"
                alt="pink_thread"
                height={122}
                width={95}
                className="absolute -top-15 right-0"
            />
        </div>
    )
}