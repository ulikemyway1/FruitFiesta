import dima from "../../../assets/images/dima-png.png";
import tanya from "../../../assets/images/tanya-png.png";
import alex from "../../../assets/images/alex-png.png";
import rss from "../../../assets/images/rss-image.svg";

const aboutData = {
  projectTitle: "Fruit Fiesta eCommerce Application",
  teamTitle: "Our team",
  teamContent: [
    {
      name: "Aleksey",
      position: "Frontend Developer",
      img: alex,
      text: "PhD in Technical Sciences and passionate about programming. Currently teaching computer science at the Department of Computer Science and Web-Design. During the final project development he did an internship in a Belarusian web-studio. The youngest and most ambitious member of our team - team lead. Lives in Belarus.",
      link: "https://github.com/ulikemyway1",
    },
    {
      name: "Tatyana",
      position: "Frontend Developer",
      img: tanya,
      text: "Linguist-translator. In 2023, completed online courses in software engineering. Studied and continues to delve into Vue.js framework. Two months ago, she found her first job by new specialization. Regularly handles a high workload, delivering high quality work under tight deadlines – active developer. Lives in Saint Petersburg.",
      link: "https://github.com/ImyaKhoroshee",
    },
    {
      name: "Dmitriy",
      position: "Frontend Developer",
      img: dima,
      text: "Engineer by profession. Worked in aerospace and nuclear power industry. Currently living in Valencia, Spain. Learning Spanish, English and fully immersed in front-end development. Detail-oriented, brilliant team player. Our go-to guy – active developer.",
      link: "https://github.com/dimabaril",
    },
  ],
  contributionTitle: "Our contribution",
  contributionText: `From the beginning the team had a cozy and balanced atmosphere. Alexander, the team lead, assigned tasks competently providing a choice. Subtasks were equivalent, each team member worked to their full potential. There was uninterrupted correspondence and weekly calls. The scrum board helped to visualize the team's work.
    
    Alexander's subtasks included creating a repository, a project in the SDK, its initial setup, registration page as well as its integration. He also installed tests and developed personal account page.
    
    Dmitriy helped with the project configuration, took over the routing, main page, product catalog and in the 4th sprint he completely mastered the work with the shopping cart.
    
    Tatyana was engaged in the creation of a comprehensive readme, took care of filling the project with products and their descriptions. She developed the design, implemented and integrated the login page, improved  header and adapted it, made detailed page, sliders and about page.
    
    Difficulties within the project were mainly related exclusively to time, since combining work, family and study is not easy, but we tried and the result is obvious.`,
  mentorTitle: "Our teacher and mentors",
  mentorText:
    "The Rolling Scopes School – the holy grail for those who want to become frontend developers. Anyone can study at RS School, regardless of age, occupation, or place of residence. The school's materials are freely available.During the training as well as the final project development we interacted with our mentors: links. We express our gratitude for the time spent on us.",
  teacherLogo: rss,
};

export default aboutData;
