import { useEffect, useState } from 'react';
import Loading from '@/components/admin/Loading';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Project from '@/components/Project';
import Skill from '@/components/Skill';
import Service from '@/components/Service';
// import Testimonial from '@/components/Testimonial';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { GetAboutMe } from '@/api/aboutme.api';
import { GetProject } from '@/api/project.api';
import { GetSkill } from '@/api/skill.api';
import { GetServices } from '@/api/service.api';
// import { GetApprovedTestimonial } from '@/api/clienttestimonial.api';

const MainPage = () => {
  // for tracking loading
  const [isLoading, setIsLoading] = useState(true);

  // Store all data in a single state object
  const [data, setData] = useState({
    about: {},
    projects: [],
    skills: [],
    services: [],
    testimonials: []
  });

  useEffect(() => {
    // 🚀 Fetch all API data in parallel
    Promise.all([
      GetAboutMe(),
      GetProject(),
      GetSkill(),
      GetServices()
    ])
      .then(([about, projects, skills, services]) => {
        setData({ about, projects, skills, services });
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // for navbar
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.6 } // Trigger when 60% of the section is visible
    );

    sections.forEach((section) => observer.observe(section));
    // clean up 
    return () => observer.disconnect();
  }, [isLoading]);

  // loading
  if (isLoading) return <Loading />

  return (
    <>
      <Navbar activeSection={activeSection} />
      <Hero iam={data.about?.tagLineSkills} />
      <About aboutMe={data.about?.aboutMeContent} />
      <Project projects={data.projects} />
      <Skill skills={data.skills} />
      <Service services={data.services} />
      {/* <Testimonial testimonials={data.testimonials} /> */}
      <Contact />
      <Footer />
    </>
  )
}

export default MainPage
