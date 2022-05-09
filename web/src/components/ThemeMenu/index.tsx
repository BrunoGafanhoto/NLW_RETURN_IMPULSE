import React, { useRef, useState, useEffect } from "react";

const mode_settings = [
     {
          id: "ligth",
          name: "Light",
          background: "light-background",
          class: "theme-mode-light",
     },
     {
          id: "dark",
          name: "Dark",
          background: "dark-background",
          class: "theme-mode-dark",
     },
];




const clickOutSide = (toggle_pallete: React.MutableRefObject<any>, content_pallete: React.MutableRefObject<any>) => {
     document.addEventListener("click", (e) => {
          //user click toggle
          if (toggle_pallete.current && toggle_pallete.current.contains(e.target)) {
               content_pallete.current.classList.add("active");
          } else {
               if (
                    content_pallete.current &&
                    !content_pallete.current.contains(e.target)
               )
                    content_pallete.current.classList.remove("active");
          }
     });
};

export const ThemeMenu = () => {
     const [currMode, setCurrMode] = useState<any>("light");
     const toggle_pallete = useRef<any>(null);
     const content_pallete = useRef<any>(null);
     clickOutSide(toggle_pallete, content_pallete);

     const handleMode = (mode: any) => {
          localStorage.setItem("mode", mode.class);
          localStorage.theme = mode.id;
     };

     if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
     } else {
          document.documentElement.classList.remove('dark')
     }

     useEffect(() => {
          const mode = mode_settings.find(
               (item) => item.class === localStorage.getItem("mode")
          );

          mode !== undefined ? setCurrMode(mode) : setCurrMode(mode_settings[0]);
     }, []);

     const closeMenu = () => {
          content_pallete.current.classList.remove("active");
     };


     // On page load or when changing themes, best to add inline in `head` to avoid FOUC
     return (
          <main className="theme__menu ">
               <button ref={toggle_pallete} className="text-4xl pointer absolute right-2 p-4 z-50  ">
                    <i className="bx bx-palette text-zinc-500 dark:text-zinc-100"></i>
               </button>
               <aside className="themeMenu bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100  w-[300px] fixed top-0 right-[-300px] m-0 shadow-lg h-full z-[999] p-6 flex gap-7 flex-col" ref={content_pallete}>
                    <span className="close cursor-pointer absolute z-[999] right-5 " onClick={() => closeMenu()}>
                         X
                    </span>

                    <h1 className="text-2xl">Themes settings</h1>

                    <h4>Choose mode</h4>
                    <section className="list_options_mode flex flex-col gap-[20px]">
                         {mode_settings.map((item, index) => (
                              <div
                                   className="option__mode flex items-center gap-[10px]"
                                   key={index}
                                   onClick={() => {
                                        setCurrMode(item);
                                        handleMode(item);
                                   }}
                              >
                                   <div className={`circle ${item.background} w-10 h-10 rounded-[50%] flex justify-center items-center`}>
                                        {item.background === currMode.background && (
                                             <i className={`bx bx-check text-2xl ${item.class}`}></i>
                                        )}
                                   </div>
                                   <p>{item.name}</p>
                              </div>
                         ))}
                    </section>
               </aside>
          </main>
     );
};
