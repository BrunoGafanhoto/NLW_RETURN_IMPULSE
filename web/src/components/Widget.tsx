
import { useRef } from 'react'
import { ChatTeardropDots } from "phosphor-react";
import { Popover } from "@headlessui/react";
import { WidgetForm } from "./WidgetForm";
import { ThemeMenu } from './ThemeMenu';


export const Widget = () => {
     const group_box = useRef<any>(null)
     const box_ref = useRef<any>(null);
     const handleClick = () => {
          const { right, top } = group_box.current.getBoundingClientRect()
          const { right: right_box, top: top_box } = box_ref.current.getBoundingClientRect()

          const rightCurr = right - right_box;
          const topCurr = top - top_box;
          box_ref.current.style.transition = 'all 1s ease-in-out'
          box_ref.current.style.transform = `translate(${rightCurr}px, ${topCurr}px)`

          setTimeout(() => {
               group_box.current.append(box_ref.current);
               box_ref.current.style.transform = `translateY(0px)`
          }, 680)

     }

     return (
          <>
               <div className="container" >
                    <ThemeMenu />
                    <div className="groupBox" ref={group_box}>
                         <div className="box">1</div>

                    </div>
                    <div className="box four" ref={box_ref} onClick={handleClick}>4</div>

                    <Popover className="absolute bottom-4 right-5 flex flex-col items-end">
                         <Popover.Panel>
                              <WidgetForm />
                         </Popover.Panel>
                         <Popover.Button className=" bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
                              <ChatTeardropDots className="w-6 h-6" />
                              <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                                   <span className="pl-2">
                                        Feedback
                                   </span>
                              </span>
                         </Popover.Button>
                    </Popover>
               </div>
          </>
     )
}