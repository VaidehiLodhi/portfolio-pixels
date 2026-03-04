import { BookmarkStack } from "./bookmark-stack"
import { GuestCheck } from "./guest-check"
import { MessageMeBlock } from "./message-me-block"

export const FooterBlock =()=> {
    return (
        <div className="grid grid-cols-2 min-h-screen bg-[#FAB5C5]">
            <div className="col-start-1 relative">
                <div className="absolute top-15 left-10 rotate-[-13.55deg]">
                    <GuestCheck/>
                </div>
                <div className="absolute top-38 right-12">
                    <BookmarkStack/>
                </div>
            </div>
            <div className="col-start-2">
                <MessageMeBlock/>
            </div>
        </div>
    )
}