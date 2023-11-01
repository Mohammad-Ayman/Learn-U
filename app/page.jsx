"use client";
import Image from "next/image";
import Link from "next/link";
import {fetchCourses, fetchUserSavedCourses } from "@/Components/Fetching/fetching";

const courses = [
  {
    id: "1",
    name: "Building ios15 App",
    author: "Tom Collins",
    category: "Programming",
    description: "Learn to build iOS apps using the latest technologies.",
    duration: "1h 17min",
    level: "Beginner",
    price: 24,
    image:
      "https://assets.api.uizard.io/api/cdn/stream/4f91c603-603d-44e2-ab35-65be1763f022.jpg",
    rate: 1.0,
    value: 11,
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Software setup", videos: 3 },
      { name: "2. UI Fundamentals", videos: 6 },
      { name: "3. Testing and Finishing", videos: 2 },
      { name: "Skill Test", videos: 1 },
    ],
  },
  {
    id: "2",
    name: "Becoming a Photographer",
    author: "Clara Manning",
    value: 69,
    category: "Photography",
    description: "Master the art of photography and capture stunning moments.",
    rate: 2.8,
    duration: "2h",
    price: 24,
    level: "Intermediate",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Camera Configuration", videos: 4 },
      { name: "2. Exposures", videos: 7 },
      { name: "3. Photo Composition", videos: 7 },
      { name: "Skill Test", videos: 3 },
    ],
    image:
      "https://www.nyip.edu/media/zoo/images/3-ways-to-become-a-better-photographer-1_19a9ab40eb62ec202806518ffdb67b08.jpg",
  },
  {
    id: "3",
    name: "Design Thinking 2.0",
    author: "Chris Kinley",
    value: 27,
    category: "Design",
    description: "Learn advanced design thinking principles and methodologies.",
    rate: 3.6,
    duration: "2h",
    price: 24,
    level: "Professional",
    image:
      "https://assets.api.uizard.io/api/cdn/stream/2c1a496b-9948-4cb1-b87e-dbd417261382.jpg",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Setting up Lighting", videos: 3 },
      { name: "2. Product Styling", videos: 5 },
      { name: "3. Post-processing", videos: 4 },
      { name: "Skill Test", videos: 1 },
    ],
  },
  {
    id: "4",
    name: "Product Photography",
    author: "Lena Gold",
    value: 11,
    category: "Photography",
    description: "Learn techniques for capturing stunning product photographs.",
    rate: 5.0,
    duration: "2h",
    price: 24,
    level: "Intermediate",
    image:
      "https://assets.api.uizard.io/api/cdn/stream/937fc2b0-e1c5-4a5a-93f7-34d23cd5ca6d.jpg",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Setting up Lighting", videos: 3 },
      { name: "2. Product Styling", videos: 5 },
      { name: "3. Post-processing", videos: 4 },
      { name: "Skill Test", videos: 1 },
    ],
  },
  {
    id: "5",
    name: "Learn how to make portraits",
    author: "Maria Silver",
    value: 27,
    category: "Photography",
    description: "Discover the art of capturing captivating portraits.",
    rate: 2,
    duration: "2h",
    price: 24,
    level: "Professional",
    image:
      "https://i.etsystatic.com/21944704/r/il/2a028b/3175957310/il_fullxfull.3175957310_3802.jpg",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Understanding Portraiture", videos: 4 },
      { name: "2. Posing Techniques", videos: 6 },
      { name: "3. Lighting for Portraits", videos: 5 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "6",
    name: "Typeface Design",
    author: "Gary Saltz",
    value: 27,
    category: "Photography",
    description: "Create your own typefaces with this comprehensive course.",
    rate: 4.6,
    duration: "2h",
    price: 24,
    level: "Intermediate",
    image:
      "https://assets.api.uizard.io/api/cdn/stream/8a82fb6d-e077-4930-b16d-a47ec1537f4a.jpg",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. History of Typefaces", videos: 3 },
      { name: "2. Typeface Anatomy", videos: 5 },
      { name: "3. Designing a Typeface", videos: 6 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "7",
    name: "Excel: Formulas and functions",
    author: "Mike Curtis",
    value: 27,
    category: "Marketing",
    description: "Master Excel formulas and functions for data analysis.",
    rate: 1.3,
    duration: "2h",
    price: 24,
    level: "Professional",
    image:
      "https://assets.api.uizard.io/api/cdn/stream/6b7ace23-9ec2-4b4e-963f-c0097a8bba79.jpg",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Basic Formulas", videos: 5 },
      { name: "2. Advanced Formulas", videos: 7 },
      { name: "3. Functions", videos: 6 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "8",
    name: "UX Essentials",
    author: "Don Draper",
    category: "Design",
    description: "UX",
    description: "Learn essential concepts of User Experience (UX) design.",
    duration: "1h 44min",
    level: "Professional",
    price: 16.99,
    rate: 3.5,
    value: 10,
    image:
      "https://images.unsplash.com/photo-1569098644956-02996eb711b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw4MHx8dXh8ZW58MXx8fHwxNjczMDE4Nzcy&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "Software setup", videos: 3 },
      { name: "UI Fundamentals", videos: 6 },
      { name: "Testing and Finishing", videos: 2 },
      { name: "Skill Test", videos: 1 },
    ],
  },
  {
    id: "9",
    name: "UX Research",
    author: "Chris Kinley",
    category: "Design",
    description: "Big Data",
    description: "Learn essential concepts of User Experience (UX) design.",
    duration: "1h 44min",
    level: "Intermediate",
    price: 16.99,
    rate: 0.8,
    value: 10,
    image:
      "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHx1eCUyMGRlc2lnbiUyMHxlbnwxfHx8fDE2NzMwMTc0MDg&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "Camera Configuration", videos: 4 },
      { name: "Exposures", videos: 7 },
      { name: "Photo Composition", videos: 7 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "10",
    name: "UX for Beginners",
    author: "Ben Starter",
    category: "Drawing",
    description: "Learn essential concepts of User Experience (UX) design.",
    duration: "1h 44min",
    level: "Beginner",
    price: 16.99,
    rate: 2,
    value: 10,
    image:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw0fHx1eCUyMGRlc2lnbnxlbnwxfHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "Test", videos: 4 },
      { name: "Test", videos: 6 },
      { name: "Test", videos: 2 },
      { name: "Skill Test", videos: 1 },
    ],
  },
  {
    id: "11",
    name: "How to UX?",
    author: "Anna May",
    category: "HR",
    description: "Learn the fundamentals of User Experience (UX) design.",
    duration: "1h 44min",
    level: "Beginner",
    price: 16.99,
    rate: 3.2,
    rate: 3.2,
    value: 10,
    image:
      "https://images.unsplash.com/photo-1547027072-332f09bd6bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw0Mnx8dXglMjBkZXNpZ258ZW58MXx8fHwxNjczMDE5MTc5&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "Test", videos: 4 },
      { name: "Test", videos: 6 },
      { name: "Test", videos: 2 },
      { name: "Skill Test", videos: 1 },
    ],
  },
  {
    id: "12",
    name: "Digital Marketing Mastery",
    author: "Emily White",
    category: "Marketing",
    description:
      "Master the art of digital marketing and boost your online presence.",
    duration: "2h 30min",
    level: "Intermediate",
    price: 34.99,
    rate: 4.2,
    value: 15,
    image:
      "https://images.unsplash.com/photo-1556822475-570b270e7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw4NXx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwxfHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. SEO Strategies", videos: 6 },
      { name: "2. Social Media Marketing", videos: 8 },
      { name: "3. Email Marketing", videos: 5 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "13",
    name: "Machine Learning Foundations",
    author: "Alex Turner",
    category: "Programming",
    description:
      "Get started with machine learning and build predictive models.",
    duration: "3h",
    level: "Intermediate",
    price: 49.99,
    rate: 4.5,
    value: 18,
    image:
      "https://images.unsplash.com/photo-1524557594315-746f1d1e1d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBmb3VuZGF0aW9uc3xlbnwxfHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Data Preprocessing", videos: 5 },
      { name: "2. Regression Models", videos: 8 },
      { name: "3. Classification Models", videos: 7 },
      { name: "Skill Test", videos: 4 },
    ],
  },
  {
    id: "14",
    name: "Web Development Bootcamp",
    author: "Sarah Smith",
    category: "Programming",
    description:
      "Learn web development from scratch and build modern websites.",
    duration: "2h 45min",
    level: "Beginner",
    price: 29.99,
    rate: 4.0,
    value: 20,
    image:
      "https://images.unsplash.com/photo-1504219857359-7a5e9d04767b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw4OHx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNjczMDE5MTk0&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. HTML & CSS Basics", videos: 7 },
      { name: "2. JavaScript Fundamentals", videos: 9 },
      { name: "3. Building Responsive Websites", videos: 6 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "15",
    name: "Artificial Intelligence in Healthcare",
    author: "Dr. Jane Anderson",
    category: "Programming",
    description:
      "Explore AI applications in healthcare for diagnosis and treatment.",
    duration: "2h 15min",
    level: "Professional",
    price: 39.99,
    rate: 3.8,
    value: 22,
    image:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw1fHxhcnRpZmlxdWElMjBpbmNlJTIwaGVhbHRoY2F1Z2h8ZW58MXx8fHwxNjczMDE5MTk0&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Medical Data Analysis", videos: 6 },
      { name: "2. Diagnostic AI Models", videos: 8 },
      { name: "3. AI in Drug Discovery", videos: 5 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "16",
    name: "Digital Art and Illustration",
    author: "Elena Martinez",
    category: "Design",
    description:
      "Unlock your creativity with digital art and illustration techniques.",
    duration: "2h 30min",
    level: "Intermediate",
    price: 34.99,
    rate: 4.5,
    value: 18,
    image:
      "https://images.unsplash.com/photo-1521737711861-1960b7bea6e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw2MHx8ZGlnaXRhbCUyMGFydCUyMGlsbHVzdHJhdGlvbiUyMHRlY2huaXF1ZSUyMG1hcmtldGx5fGVufDB8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Digital Painting Techniques", videos: 7 },
      { name: "2. Character Illustration", videos: 8 },
      { name: "3. Digital Artistry Tips", videos: 6 },
      { name: "Skill Test", videos: 4 },
    ],
  },
  {
    id: "17",
    name: "Financial Planning and Investment",
    author: "John Davis",
    category: "HR",
    description:
      "Learn financial planning, budgeting, and investment strategies.",
    duration: "2h 45min",
    level: "Intermediate",
    price: 29.99,
    rate: 4.2,
    value: 20,
    image:
      "https://images.unsplash.com/photo-1553163141-4b943f1cb0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGFuZCUyMGludmVzdG1lbnR8ZW58MXx8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Financial Planning Basics", videos: 7 },
      { name: "2. Investment Strategies", videos: 8 },
      { name: "3. Retirement Planning", videos: 6 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "18",
    name: "Digital Photography Essentials",
    author: "Michael Turner",
    category: "Photography",
    description:
      "Master the art of digital photography and capture stunning images.",
    duration: "2h 15min",
    level: "Intermediate",
    price: 39.99,
    rate: 2.0,
    value: 22,
    image:
      "https://images.unsplash.com/photo-1555685814-ec0eb86c2253?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxfHhpZ2h0JTIwbG91c3RyYXRpb24lMjBhbmQlMjBpbnZlc3RtZW50fGVufDB8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Camera Settings", videos: 7 },
      { name: "2. Composition Techniques", videos: 8 },
      { name: "3. Editing and Post-processing", videos: 6 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "19",
    name: "Python for Data Analysis",
    author: "Linda Peterson",
    category: "Programming",
    description:
      "Learn Python programming for data analysis and visualization.",
    duration: "2h 30min",
    level: "Intermediate",
    price: 34.99,
    rate: 3.8,
    value: 15,
    image:
      "https://images.unsplash.com/photo-1509565866022-0f4ffaa879f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxfHxweXRob24lMjBmb3IlMjBkYXRhJTIwYW5hbHlzaXxlbnwxfHx8fHwxNjczMDE5MTk0&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Python Basics", videos: 7 },
      { name: "2. Data Manipulation with Pandas", videos: 8 },
      { name: "3. Data Visualization with Matplotlib", videos: 6 },
      { name: "Skill Test", videos: 4 },
    ],
  },
  {
    id: "20",
    name: "Leadership and Management",
    author: "Sophia Clark",
    category: "HR",
    description: "Develop leadership and management skills for career growth.",
    duration: "2h 45min",
    level: "Professional",
    price: 29.99,
    rate: 1.3,
    value: 20,
    image:
      "https://images.unsplash.com/photo-1534786471127-5a69c17e1e4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHxsaWdodG5lc3MlMjBhbmQlMjBtYW5hZ2VtZW50fGVufDB8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Leadership Fundamentals", videos: 7 },
      { name: "2. Effective Team Management", videos: 8 },
      { name: "3. Strategic Planning", videos: 6 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "21",
    name: "Spanish Language Mastery",
    author: "Carlos Rodriguez",
    category: "Design",
    description:
      "Become fluent in Spanish with comprehensive language lessons.",
    duration: "2h 30min",
    level: "Beginner",
    price: 34.99,
    rate: 2.6,
    value: 18,
    image:
      "https://images.unsplash.com/photo-1568586068277-83b23e4a6949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw3MHx8c3BhbmlzaCUyMGxhbmd1YWdlfGVufDB8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Basic Vocabulary", videos: 7 },
      { name: "2. Conversational Spanish", videos: 8 },
      { name: "3. Cultural Insights", videos: 6 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "22",
    name: "Artificial Intelligence Ethics",
    author: "Dr. Alan Foster",
    category: "Programming",
    description: "Explore the ethical implications of AI and machine learning.",
    duration: "2h 15min",
    level: "Professional",
    price: 39.99,
    rate: 3.1,
    value: 22,
    image:
      "https://images.unsplash.com/photo-1564772126-4f4e4470e3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw1MXx8YXJ0aWZpY3klMjBpbXBsaWNhdGlvbnxlbnwxfHx8fHwxNjczMDE5MTk0&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. AI Bias and Fairness", videos: 6 },
      { name: "2. Privacy and Data Ethics", videos: 8 },
      { name: "3. Ethical AI Development", videos: 5 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "23",
    name: "Digital Marketing Analytics",
    author: "Rachel Turner",
    category: "Marketing",
    description:
      "Learn how to use data analytics for effective digital marketing strategies.",
    duration: "2h 30min",
    level: "Intermediate",
    price: 34.99,
    rate: 4.3,
    value: 18,
    image:
      "https://images.unsplash.com/photo-1550745165-570b270e7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw4OXx8ZGlnaXRhbCUyMG1hcmtldGluZyUyMGFuZCUyMGNvbXBldGl0aW9uJTIwYXNzaWdub258ZW58MXx8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Data Collection and Analysis", videos: 7 },
      { name: "2. Google Analytics", videos: 8 },
      { name: "3. Campaign Optimization", videos: 6 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "24",
    name: "Creative Writing Workshop",
    author: "Olivia Walker",
    category: "Drawing",
    description:
      "Unleash your creativity with writing exercises and storytelling techniques.",
    duration: "2h 45min",
    level: "Intermediate",
    price: 29.99,
    rate: 4.5,
    value: 20,
    image:
      "https://images.unsplash.com/photo-1565092396188-2a23f3f4dce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHxjcmVhdGl2ZSUyMGdyYXRpbmclMjB3cml0aW5nJTIwd29ya3Nob3d0aW5nJTIwdGVhbXN0cmFpbmd8ZW58MXx8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Creative Writing Techniques", videos: 7 },
      { name: "2. Storytelling Strategies", videos: 8 },
      { name: "3. Poetry and Prose", videos: 6 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "25",
    name: "Data Science for Beginners",
    author: "Dr. Sarah Johnson",
    category: "Marketing",
    description:
      "Introduction to data science, data analysis, and visualization.",
    duration: "2h 15min",
    level: "Beginner",
    price: 39.99,
    rate: 3.0,
    value: 22,
    image:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHxkYXRhJTIwc2NpZW5jZXxlbnwxfHx8fHwxNjczMDE5MTk0&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Data Analysis Tools", videos: 7 },
      { name: "2. Data Visualization", videos: 8 },
      { name: "3. Case Studies", videos: 6 },
      { name: "Skill Test", videos: 3 },
    ],
  },
  {
    id: "26",
    name: "Photography Editing Techniques",
    author: "David Miller",
    category: "Drawing",
    description:
      "Master photo editing software and enhance your photography skills.",
    duration: "2h 30min",
    level: "Intermediate",
    price: 34.99,
    rate: 2.2,
    value: 18,
    image:
      "https://images.unsplash.com/photo-1564429598085-754d7f0e92bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw1M3x8cGhvdG9ncmFwaHklMjBlZGl0aW5nJTIwdGVhbXN0cmFpbmd8ZW58MXx8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Editing Software Basics", videos: 7 },
      { name: "2. Retouching and Effects", videos: 8 },
      { name: "3. Advanced Editing Techniques", videos: 6 },
      { name: "Skill Test", videos: 4 },
    ],
  },
  {
    id: "27",
    name: "Entrepreneurship Fundamentals",
    author: "Mark Johnson",
    category: "HR",
    description:
      "Learn the basics of entrepreneurship and starting your own business.",
    duration: "2h 45min",
    level: "Beginner",
    price: 29.99,
    rate: 1.6,
    value: 20,
    image:
      "https://images.unsplash.com/photo-1530614387541-8138f6871b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHxlbmR0cmVlJTIwcHJvZHVjdHklMjBzZWN1cml0eSUyMGJ5fGVufDB8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Entrepreneurial Mindset", videos: 7 },
      { name: "2. Business Planning", videos: 8 },
      { name: "3. Marketing Strategies", videos: 6 },
      { name: "Skill Test", videos: 2 },
    ],
  },
  {
    id: "28",
    name: "Digital Illustration Masterclass",
    author: "Sophie Adams",
    category: "Design",
    description:
      "Advance your digital illustration skills with in-depth techniques.",
    duration: "2h 15min",
    level: "Professional",
    price: 39.99,
    rate: 0.3,
    value: 22,
    image:
      "https://images.unsplash.com/photo-1554177252-6a6f3e9ef5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw0NXx8ZGlnaXRhbCUyMGlsbHVzdHJhdGlvbiUyMG1hcmtldGx5fGVufDB8fHx8fDE2NzMwMTkwOTQ&ixlib=rb-4.0.3&q=80&w=1080",
    content: [
      { name: "Introduction", videos: 1 },
      { name: "1. Digital Drawing Tools", videos: 7 },
      { name: "2. Illustration Techniques", videos: 8 },
      { name: "3. Creating Digital Art", videos: 6 },
      { name: "Skill Test", videos: 3 },
    ],
  },
];

// let courses = [];
const firstPage = () => {
  return (
    <div className="flex bg-gray-300 w-screen h-screen">
      <div className="w-1/2 flex items-center justify-center h-screen">
        <div className="flex flex-col mx-auto w-3/6 h-54">
          <div className="flex text-blue-500">
            <div className="text-blue-500 hover:text-blue-400 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 mx-auto"
              >
                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
              </svg>
            </div>
            <p className="font-semibold content-center text-lg text-center m-2">
              LearnU
            </p>
          </div>
          <div className="mt-14">
            <h2 className="text-5xl font-semibold tracking-wide">
              Discover Passion
            </h2>
            <p className="text-xl font-semibold text- tracking-norml mt-8">
              Find out what topics you find interesting, learn a new skills &
              connect with people that are Passion about similar topic
            </p>
          </div>
          <div>
            <Link href="/signin">
              <button className="block bg-blue-600 hover:bg-blue-500 text-white text-xl p-1 font-bold w-52 h-12 mt-10 tracking-wide rounded-xl">
                GET STARTED
              </button>
            </Link>
            <Link href="/home">
              <button className="bg-blue-600 hover:bg-blue-500 text-white pr-8 pl-8 text-2xl p-1 font-bold w-102 h-12 mt-10 tracking-wide rounded-xl">
                Continue As A Guest
              </button>
            </Link>
            {/* <button
              onClick={async () => {
                const savedCourses = await fetchUserSavedCourses('QuJBDm4wTeMNvUNf9HgsKdP5lF42');
                const courses = await fetchCourses();
                let newcourses=[]
                courses.map((course) => {
                  savedCourses.savedCourses.includes(course._id) ? course = {saved: true, ...course} : course = {saved: false, ...course} 
                  newcourses.push(course)
                })
              }
              }
            >
              hereee
            </button> */}

          </div>
        </div>
      </div>

      <div className="flex bg-white rounded-l-[70px] ml-auto items-center justify-center h-screen md:w-1/2 w-2/5">
        <Image
          className=""
          src="https://assets.api.uizard.io/api/cdn/stream/a8ce660d-47da-404a-b3b3-63ca6970ddcf.png"
          width={500}
          height={500}
          alt="Landing page"
        />
      </div>
    </div>
  );
};

export default firstPage;
export { courses };
