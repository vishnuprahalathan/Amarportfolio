import ShowreelHero from "@/components/sections/ShowreelHero";
import CinematicPortrait from "@/components/sections/CinematicPortrait";

import FeaturedShowcase from "@/components/sections/FeaturedShowcase";
import CinematicProjects from "@/components/sections/CinematicProjects";
import EditingStyles from "@/components/sections/EditingStyles";
import FilmAbout from "@/components/sections/FilmAbout";
import CinematicFooter from "@/components/sections/CinematicFooter";
import EditorTimeline from "@/components/ui/EditorTimeline";
import FilmGrain from "@/components/ui/FilmGrain";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <FilmGrain />
      
      <div className="relative z-10">
        <ShowreelHero />
        <CinematicPortrait />
        <FeaturedShowcase />
        <CinematicProjects />
        <EditingStyles />
        <FilmAbout />
        <CinematicFooter />
      </div>

      <EditorTimeline />
    </main>
  );
}
