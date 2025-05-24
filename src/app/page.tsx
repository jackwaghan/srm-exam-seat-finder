import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";

export default function Home() {
  return (
    <div className="flex flex-col container mx-auto min-h-screen ">
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </div>
  );
}
