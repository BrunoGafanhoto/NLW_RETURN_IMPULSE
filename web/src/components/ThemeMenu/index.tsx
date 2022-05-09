// import React, { useRef, useState, useEffect, RefObject, ReactNode } from "react";

// const mode_settings = [
//   {
//     id: "ligth",
//     name: "Ligth",
//     background: "light-background",
//     class: "theme-mode-ligth",
//   },
//   {
//     id: "dark",
//     name: "Dark",
//     background: "dark-background",
//     class: "theme-mode-dark",
//   },
// ];

// interface clickOutSideProps {
//     toggle_pallete: HTMLDivElement;
//     content_pallete: HTMLDivElement;
// }

// type NewType = clickOutSideProps;

// const clickOutSide = (toggle_pallete, content_pallete ) => {
//   document.addEventListener("click", (e) => {
//     //user click toggle
//     if (toggle_pallete.current && toggle_pallete.current.contains(e.target)) {
//       content_pallete.current.classList.add("active");
//     } else {
//       if (
//         content_pallete.current &&
//         !content_pallete.current.contains(e.target)
//       )
//         content_pallete.current.classList.remove("active");
//     }
//   });
// };

// export const ThemeMenu = () => {
//   const [currMode, setCurrMode] = useState<string | Object>("light");
//   const toggle_pallete = useRef<HTMLAllCollection>(null);
//   const content_pallete = useRef<HTMLAllCollection>(null);
//   clickOutSide(toggle_pallete, content_pallete);

//   const handleMode = (mode: !) => {
//     localStorage.setItem("mode", mode.class);
//   };

//   useEffect(() => {
//     const mode = mode_settings.find(
//       (item) => item.class === localStorage.getItem("mode")
//     );

//     mode !== undefined ? setCurrMode(mode) : setCurrMode(mode_settings[0]);
//   }, []);

//   const closeMenu = () => {
//     content_pallete.current.classList.remove("active");
//   };

//   return (
//     <main className="theme__menu">
//       <button ref={toggle_pallete}>
//         <i className="bx bx-palette"></i>
//       </button>
//       <aside className="themeMenu" ref={content_pallete}>
//         <span className="close" onClick={() => closeMenu()}>
//           X
//         </span>

//         <h1>Themes settings</h1>

//         <h4>Choose mode</h4>
//         <section className="list_options_mode">
//           {mode_settings.map((item, index) => (
//             <div
//               className="option__mode"
//               key={index}
//               onClick={() => {
//                 setCurrMode(item);
//                 handleMode(item);
//               }}
//             >
//               <div className={`circle ${item.background}`}>
//                 {item.background === currMode.background && (
//                   <i className="bx bx-check"></i>
//                 )}
//               </div>
//               <p>{item.name}</p>
//             </div>
//           ))}
//         </section>
//       </aside>
//     </main>
//   );
// };
