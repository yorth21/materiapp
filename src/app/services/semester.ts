import courses from '@/mocks/courses.json';
import { ISemester } from '@/types/semester';

interface ICourse {
  codigo: string;
  asignatura: string;
  creditos: number;
  semestre: number;
  requisito: string;
}

export function getSemesters(): ISemester[] {
  const groupedBySemester = (courses as ICourse[]).reduce((acc, course) => {
    const semester = course.semestre;
    if (!acc[semester]) {
      acc[semester] = { number: semester, courses: [] };
    }
    acc[semester].courses.push({
      name: course.asignatura,
      credits: course.creditos,
    });
    return acc;
  }, {} as Record<number, ISemester>);

  return Object.values(groupedBySemester);
}
