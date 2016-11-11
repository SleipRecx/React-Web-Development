import dispatcher from '../dispatcher'

export function login(user){
  var token = {
    "loggedIn":"true",
    "face_id": user.id,
    "first_name": user.name.split(" ")[0],
    "last_name": user.name.split(" ")[1],
    "image": user.picture.data.url,
    "email":user.email}
  dispatcher.dispatch({
      type: "LOGIN",
      token
  });
}

export function loadMoreBooks(data){
  dispatcher.dispatch({
      type: "MORE_BOOKS",
      data
  });
}

export function logout(){
  dispatcher.dispatch({
      type: "LOGOUT"
  });
}

export function addBook(data){
  dispatcher.dispatch({
      type: "ADD_BOOK",
      data
  });
}

export function newBookAdded(){
  dispatcher.dispatch({
      type: "NEW_BOOK_ADDED"
  });
}
