import React, {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";


const usePages = (uid: string) => {

  const [ pages, setPages ] = useState([]);

  const fetchPages = async () => {

    const response = await fetch("/api/pages");
    if (response.status === 200) {

      const pages = await response.json();
      console.log("updating pages: ", pages);
      setPages(pages);
    } else {

      console.warn(`Received ${response.status} when fetching brands..`);
    }
  };

  useEffect(() => {fetchPages()}, [uid]);

  return pages;
};

export const PagesContext = createContext({pages: []});
export const PagesContextProvider = (props) => {

  const { user } = useContext(UserContext);
  if (!user) throw "Should not see this if not logged in!";

  const pages = usePages(user.sub);

  return <PagesContext.Provider value={{pages}}>
      {props.children}
  </PagesContext.Provider>
};
