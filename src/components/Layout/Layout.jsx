import Appbar from "../AppBar/AppBar";

export default function Layout({ children }) {
  return (
    <div>
      <Appbar />
      {children}
    </div>
  );
}
