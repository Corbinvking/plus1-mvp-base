interface ExampleLesson {
  id: string;
  title: string;
  description: string;
  contentType: 'video' | 'pdf';
  contentUrl: string;
  duration: number; // in minutes
}

interface ExampleCourse {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: ExampleLesson[];
}

export const EXAMPLE_COURSES: ExampleCourse[] = [
  {
    id: 'web-dev-basics',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development with HTML, CSS, and JavaScript',
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop',
    lessons: [
      {
        id: 'intro-to-html',
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML structure and common elements',
        contentType: 'video',
        contentUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
        duration: 60
      },
      {
        id: 'css-basics',
        title: 'CSS Fundamentals',
        description: 'Master the basics of styling with CSS',
        contentType: 'video',
        contentUrl: 'https://www.youtube.com/embed/yfoY53QXEnI',
        duration: 45
      },
      {
        id: 'html-cheatsheet',
        title: 'HTML5 Cheat Sheet',
        description: 'A comprehensive HTML5 reference guide',
        contentType: 'pdf',
        contentUrl: 'https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf',
        duration: 15
      }
    ]
  },
  {
    id: 'react-essentials',
    title: 'React.js Essential Training',
    description: 'Master the fundamentals of React.js development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    lessons: [
      {
        id: 'react-intro',
        title: 'Introduction to React',
        description: 'Understanding React basics and component architecture',
        contentType: 'video',
        contentUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
        duration: 90
      },
      {
        id: 'react-hooks',
        title: 'React Hooks Deep Dive',
        description: 'Learn about React Hooks and state management',
        contentType: 'video',
        contentUrl: 'https://www.youtube.com/embed/TNhaISOUy6Q',
        duration: 30
      },
      {
        id: 'react-cheatsheet',
        title: 'React Cheat Sheet',
        description: 'Quick reference guide for React concepts',
        contentType: 'pdf',
        contentUrl: 'https://devhints.io/react',
        duration: 20
      }
    ]
  }
]; 