import { BookmarkStack } from "./bookmark-stack"
import { GuestCheck } from "./guest-check"
import { MessageMeBlock } from "./message-me-block"

export const FooterBlock =()=> {
    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="col-start-1 ">
                <GuestCheck/>
                <BookmarkStack/>
            </div>
            <MessageMeBlock/>
        </div>
    )
}