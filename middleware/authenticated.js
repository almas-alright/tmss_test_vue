export default function ({ store, redirect }) {
  console.log("logged in", store.state)
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
