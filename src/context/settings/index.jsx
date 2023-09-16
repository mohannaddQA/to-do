import React, { useEffect, createContext, useContext, useState } from "react";
/* ---------------------------------------------------------------------------- */
/*TO SET A GLOBAL STATE WE NEED TO CREATE A CONTEXT RELATED TO OUR GLOBAL STATE */
export const SettingContext = createContext();

// export const useSettingsContext = () => {
//   return useContext(SettingContext);
// };
/* ---------------------------------------------------------------------------- */

export const SettingsProvider = (props) => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortBy, setSortBy] = useState("difficulty");

  //this function will save my current settings into local storage
  const saveSettingsInLocalStorage = (
    itemsPerPage = 3,
    hideCompleted = true,
    sortBy = "difficulty"
  ) => {
    localStorage.setItem(
      "toDoSettings",
      JSON.stringify({
        itemsPerPage: itemsPerPage,
        hideCompleted: hideCompleted,
        sortBy: sortBy.toLowerCase(),
      })
    );
  };
  // on every refresh i will retrieve my saved settings from the local storage
  useEffect(() => {
    if (localStorage.getItem("toDoSettings")) {
      let savedSettings = JSON.parse(localStorage.getItem("toDoSettings"));
      setItemsPerPage(savedSettings.itemsPerPage);
      setHideCompleted(savedSettings.hideCompleted);
      setSortBy(savedSettings.sortBy);
    }
  }, []);

  const sharedValues = {
    itemsPerPage,
    setItemsPerPage,
    hideCompleted,
    setHideCompleted,
    sortBy,
    setSortBy,
    saveSettingsInLocalStorage,
  };
  return (
    <SettingContext.Provider value={sharedValues}>
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;

/*--------------------------------- */
/* this is for explaination prpose */

// export const SettingsProvider = ({ children }) => {
//   const defaultSettings = {
//     itemsConunt: 3,
//     hideCompleted: true,
//     SortBy: "difficulty",
//   };

//   const [example, setNewExample] = useState("world war I");
//   const [settings, setNewSettings] = useState(defaultSettings);

//   const sharedStatesAndFuncAndOBJ = {
//     settings,
//     setNewSettings,
//     example,
//     setNewExample,
//   };
//   return (
//     /* NOW WE NEED TO WRAP OUR (children properity) WITH THE CONTEXT  */
//     /*THE children variable will represent any component that will be a child (inside) this component (SettingsProvider)
//     ==> the children variable represents the consumer components
//     ==>this component is the (SettingsProvider component) ==> it represents the provider component  */
//     /* ---------------------------------------------------------- */
//     <SettingContext.Provider value={sharedStatesAndFuncAndOBJ}>
//       {children}
//     </SettingContext.Provider>
//     /*---------------------------------------------------------- */
//     /*  any component inside of the SettingsProvider component will be as if it was in the place of the children
//     and have access to what ever we send within the value  */
//   );
// };
/*-------------------------------------------- */

/*-------------------------------------------- */
/* this is just another way to access the children of the component instead of destructuring the props ==> we use props and props.children*/
/* 
export const SettingsProvider = (props) => {
  const sharedStatesAndFuncAndOBJ = {};
  // to see the props obj ==> use console.log(props)
  return (
    <SettingContext.Provider value={sharedStatesAndFuncAndOBJ}>
      {props.children}
    </SettingContext.Provider>
  );
};
*/
/*--------------------------------------------- */
