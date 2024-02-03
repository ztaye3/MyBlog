import React from "react";
import About from "./components/about/About";
import "./static /App.css";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./Footer";
import Home from "./components/home/Home";
import Project from "./components/project/Project";
import Service from "./components/services/Service";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Root from "./redux/Root";
import Activate from "./components/signup/Activate";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ResetPassword from "./components/login/ResetPassword";
import ResetPasswordConfirm from "./components/login/ResetPasswordConfirm";
import axios from "axios";
import {BASE_BACKEND_URL, BASE_FRONTEND_URL, } from "./utils/Constant";
import Test from "./components/Test";
import authentication from "./utils/Authentication";
import AddUser from "./components/admin/user/AddUser";
import AdminUser from "./components/admin/user/AdminUser";
import AddPost from "./components/admin/post/AddPost";
import AddCategory from "./components/admin/category/AddCategory";
import AdminComment from "./components/admin/comment/AdminComment";
import AdminPost from "./components/admin/post/AdminPost";
import AdminCategory from "./components/admin/category/AdminCategory";
import Theme from "./components/theme";
import {CssBaseline} from "@material-ui/core";
import AppHeader from "./components/app-header";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import HomePage from "./pages/home-page";
import SearchPage from "./pages/search-page";
import FavoritesPage from "./pages/favorites-page";
import SavedPage from "./pages/saved-page";
import SettingsPage from "./pages/settings-page";
import PostPage from "./pages/post-page";
import { isMobile } from "./utils/functions";
import LabelBottomNavigation from "./components/bottom-navigation";
import Post from "./components/post/post-component";

import { Provider } from "react-redux";
import Logout from "./components/logout/Logout";
import AddCv from "./components/admin/personal/AddCv";
import AddAbout from "./components/admin/personal/AddAbout";
import AddProject from "./components/admin/personal/AddProject";
import AdminCv from "./components/admin/personal/AdminCv";
import AdminProject from "./components/admin/personal/AdminProject";
import AdminAbout from "./components/admin/personal/AdminAbout";
/* Check if server is running in development or production*/
if (window.location.origin === BASE_FRONTEND_URL) {
  axios.defaults.baseURL = BASE_BACKEND_URL;  //Development
} else {
  axios.defaults.baseURL = window.location.origin;  //Production
}

function App() {

    /**
     * Blog router
     */
      if(window.location.pathname.includes('blog')){

          return (
                    <div>
                        <Root>
                                  <Theme>
                                    <CssBaseline />
                                    <Router basename={process.env.PUBLIC_URL}>
                                      <div className="App">
                                        <AppHeader />
                                        <Container>
                                          <Box>
                                            <Switch>

                                              <Route eaxt path="/blog/search/">
                                                <SearchPage />
                                              </Route>
                                              <Route exact path="/blog/favorites/">
                                                <FavoritesPage />
                                              </Route>
                                              <Route exact path="/blog/saved/">
                                                <SavedPage />
                                              </Route>
                                              <Route exact path="/blog/settings/">
                                                <SettingsPage />
                                              </Route>
                                              <Route exact path="/blog/post/">
                                                <PostPage />
                                              </Route>
                                              <Route  exact path="/blog/post/:slug">
                                                  <Post/>
                                              </Route>
                                                <Route  path="/blog/">
                                                <HomePage />
                                              </Route>
                                            </Switch>
                                          </Box>
                                        </Container>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        {isMobile() && <LabelBottomNavigation />}
                                      </div>
                                    </Router>
                                  </Theme>
                        </Root>
                    </div>
                  );
      }
    /**
     * Portfolio router
     */
      else{
          return (
                    <div>
                          <Root>
                                   <Switch>

                                               <Route path="/about" exact component={About}/>
                                               <Route path="/services" exact component={Service }/>
                                               <Route path="/portfolio" exact component={Project}/>
                                               {/*<Route path="/blog" exact component={Blog }/>*/}
                                               <Route path="/contact" exact component={Contact}/>
                                               <Route path="/footer" exact component={Footer}/>
                                               <Route  exact path="/activate/:uid/:token" component={Activate}/>
                                               <Route path="/login" component={Login}/>
                                               <Route path="/signup" component={Signup}/>
                                               <Route path="/logout" component={Logout}/>
                                               <Route exact path='/reset-password' component={ResetPassword} />
                                               <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                                               <Route path="/test" exact component={Test}/>
                                               <Route exact path="/manageUser" component={authentication(AdminUser)}/>
                                               <Route exact path="/addUser" component={authentication(AddUser)}/>
                                               <Route path="/managePostCategory" exact component={authentication(AdminCategory)}/>
                                               <Route exact path="/managePost" component={authentication(AdminPost)}/>
                                               <Route exact path="/manageComment" component={authentication(AdminComment)}/>
                                               <Route path="/addPostCategory" exact component={authentication(AddCategory)}/>
                                               <Route exact path="/addPost" component={authentication(AddPost)}/>
                                               <Route exact path="/addCv" component={authentication(AddCv)}/>
                                               <Route exact path="/addAbout" component={authentication(AddAbout)}/>
                                               <Route exact path="/addProject" component={authentication(AddProject)}/>
                                                <Route exact path="/manageCv" component={authentication(AdminCv)}/>
                                               <Route exact path="/manageProject" component={authentication(AdminProject)}/>
                                               <Route exact path="/manageAbout" component={authentication(AdminAbout)}/>
                                                <Route path="/"   component={Home}/>

                                     </Switch>
                          </Root>
                    </div>

          );
      }

}

export default App;
