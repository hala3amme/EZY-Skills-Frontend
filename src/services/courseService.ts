import { api } from '../api/http';
import type {
  CourseDetail,
  CourseSummary,
  CourseId,
  EnrollmentId,
  EnrollmentRequestResponse,
  EnrollmentReviewResponse,
  MyEnrollmentsResponse,
  PaginatedResponse,
  StudentCoursesResponse,
  TeacherEnrollmentsResponse,
} from '../types/api';

export type ListCoursesParams = {
  search?: string;
  tag?: string;
  page?: number;
};

export async function listCourses(params: ListCoursesParams = {}): Promise<PaginatedResponse<CourseSummary>> {
  const { data } = await api.get<PaginatedResponse<CourseSummary>>('/courses', { params });
  return data;
}

export async function getCourse(courseId: CourseId): Promise<CourseDetail> {
  const { data } = await api.get<CourseDetail>(`/courses/${courseId}`);
  return data;
}

export async function getCourseContent(courseId: CourseId): Promise<CourseDetail> {
  const { data } = await api.get<CourseDetail>(`/courses/${courseId}/content`);
  return data;
}

export async function enrollInCourse(courseId: CourseId): Promise<EnrollmentRequestResponse> {
  const { data } = await api.post<EnrollmentRequestResponse>(`/courses/${courseId}/enroll`);
  return data;
}

export async function myEnrollments(): Promise<MyEnrollmentsResponse> {
  const { data } = await api.get<MyEnrollmentsResponse>('/me/enrollments');
  return data;
}

export async function myCourses(): Promise<StudentCoursesResponse> {
  const { data } = await api.get<StudentCoursesResponse>('/me/courses');
  return data;
}

export type TeacherEnrollmentsParams = { status?: 'pending' | 'approved' | 'declined' };

export async function teacherEnrollments(params: TeacherEnrollmentsParams = {}): Promise<TeacherEnrollmentsResponse> {
  const { data } = await api.get<TeacherEnrollmentsResponse>('/teacher/enrollments', { params });
  return data;
}

export async function approveEnrollment(enrollmentId: EnrollmentId): Promise<EnrollmentReviewResponse> {
  const { data } = await api.post<EnrollmentReviewResponse>(
    `/teacher/enrollments/${enrollmentId}/approve`
  );
  return data;
}

export async function declineEnrollment(enrollmentId: EnrollmentId): Promise<EnrollmentReviewResponse> {
  const { data } = await api.post<EnrollmentReviewResponse>(
    `/teacher/enrollments/${enrollmentId}/decline`
  );
  return data;
}

export async function teacherDashboard(): Promise<{ courses: unknown[] }> {
  const { data } = await api.get<{ courses: unknown[] }>('/teacher/dashboard');
  return data;
}
