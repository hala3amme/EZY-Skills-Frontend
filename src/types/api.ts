export type CourseId = number;
export type EnrollmentId = number;
export type NotificationId = string;

export type UserRole = 'student' | 'teacher' | 'admin';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export interface MeResponse {
  user: ApiUser;
}

export interface MessageResponse {
  message: string;
}

export type EnrollmentStatus = 'pending' | 'approved' | 'declined';

export interface EnrollmentRequestResponse {
  message: string;
  enrollment: {
    id: EnrollmentId;
    status: EnrollmentStatus;
  };
}

export interface EnrollmentReviewResponse {
  message: string;
  enrollment: {
    id: EnrollmentId;
    status: EnrollmentStatus;
    reviewed_at: string | null;
  };
}

export interface MyEnrollmentCourse {
  id: CourseId;
  title: string;
  image_url: string | null;
  teacher: {
    id: number;
    name: string;
  };
  tags: string[];
}

export interface MyEnrollment {
  id: EnrollmentId;
  status: EnrollmentStatus;
  reviewed_at: string | null;
  course: MyEnrollmentCourse;
}

export interface MyEnrollmentsResponse {
  enrollments: MyEnrollment[];
}

export interface StudentCourse {
  id: CourseId;
  image_url: string | null;
  title: string;
  description: string | null;
  demo_url: string | null;
  curriculum_url: string | null;
  teacher: {
    id: number;
    name: string;
  };
  tags: string[];
}

export interface StudentCoursesResponse {
  courses: StudentCourse[];
}

export interface TeacherEnrollment {
  id: EnrollmentId;
  status: EnrollmentStatus;
  created_at: string;
  reviewed_at: string | null;
  course: {
    id: CourseId;
    title: string;
  };
  student: {
    id: number;
    name: string;
    email: string;
    phone_number: string | null;
  };
}

export interface TeacherEnrollmentsResponse {
  enrollments: TeacherEnrollment[];
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationMetaLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface CourseSummary {
  id: CourseId;
  image_url: string | null;
  title: string;
  description: string | null;
  demo_url: string | null;
  curriculum_url: string | null;
  teacher: ApiUser;
  tags: string[];
}

export interface CourseObjective {
  id: number;
  position: number;
  objective: string;
}

export interface CourseVideo {
  id: number;
  serial_number: number;
  title: string;
  description: string | null;
  is_locked: boolean;
  video_url: string | null;
}

export interface CourseProject {
  id: number;
  title: string;
  description: string | null;
  project_url: string | null;
}

export interface CourseTool {
  id: number;
  name: string;
  url: string | null;
  description: string | null;
}

export interface CourseDetail {
  id: CourseId;
  image_url: string | null;
  title: string;
  description: string | null;
  demo_url: string | null;
  curriculum_url: string | null;
  teacher: ApiUser;
  tags: string[];
  objectives: CourseObjective[];
  videos: CourseVideo[];
  projects: CourseProject[];
  tools: CourseTool[];
}

export interface Notification {
  id: NotificationId;
  type: string;
  data: Record<string, unknown>;
  read_at: string | null;
  created_at: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
}
