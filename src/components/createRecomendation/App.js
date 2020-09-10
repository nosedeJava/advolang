import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CreateRecommendation from "./CreateRecommendation";
import AddCategory from "./AddCategory";


const testInfo= {
  title: "Las crónicas de Narnia: El león, la bruja y el ropero",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum velit dui, in vehicula mi accumsan id. Suspendisse potenti. Duis id cursus velit. Praesent dapibus arcu eu dolor aliquet euismod. Sed congue nunc vehicula est molestie, a egestas lacus congue. Quisque finibus cursus justo, et scelerisque nibh. Suspendisse eget orci sit amet massa vehicula dictum. Curabitur et erat nunc. Vestibulum leo orci, dapibus eu finibus eget, ultrices non lectus. Etiam eu congue mi. Phasellus accumsan nisl vel vehicula tincidunt. Curabitur rhoncus arcu sed facilisis porttitor. Etiam tortor nisi, dictum ornare lorem id, ornare vulputate augue. Fusce tincidunt nibh ut mollis tempus. Quisque euismod, turpis ut mattis mollis, est nisi accumsan ex, ac elementum est erat id velit. Integer non nunc sed felis volutpat hendrerit id ac nisi.",
  sourceImage:"/img/test.png",
  score: 4.7,
  link: "https://youtu.be/dQw4w9WgXcQ",
  author: {
    username: "Stilink",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    profileImg: "/img/profile_image.jpg"
  },
  categories: ["gameplay","gameplay", "videogame", "FFVII", "GPB", "gameplay", "videogame", "FFVII", "GPB"],
}
function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={CreateRecommendation}/>
              <Route path="/cat" exact component={AddCategory}/>
          </Switch>
      </BrowserRouter>
  )
}

export default App;