'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Book, CheckCheck, GraduationCap, Calendar, Award } from 'lucide-react'
import { ICourse } from '@/types/course'
import { ISemester } from '@/types/semester'
import { getSemesters } from '../services/semester'
import { Progress } from '@/components/ui/progress'

export default function CourseManager() {
  const [semesters] = useState<ISemester[]>(getSemesters())
  const [coursesSelected, setCoursesSelected] = useState<ICourse[]>([])

  const selectCurse = (course: ICourse) => {
    if (coursesSelected.includes(course)) {
      setCoursesSelected(coursesSelected.filter((c) => c !== course))
      return
    }

    setCoursesSelected([...coursesSelected, course])
  }

  const getTotalCreditsApproved = (courses: ICourse[]) => {
    return courses.reduce((total, course) => total + course.credits, 0)
  }

  const getTotalCreditsBySemester = (courses: ICourse[]) => {
    return courses.reduce((total, course) => total + course.credits, 0)
  }

  const getTotalProgramCredits = (semesters: ISemester[]) => {
    return semesters.reduce((total, semester) => total + getTotalCreditsBySemester(semester.courses), 0)
  }

  return (
    <div className="container max-w-2xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Materiapp</h1>
        <p className="text-muted-foreground">
          Selecciona las materias que ya has aprobado
          
        </p>
        <p className="italic text-muted-foreground text-sm">(Solo para ingeniería de sistemas)</p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <span>Resumen del Programa</span>
            </div>
            <span className="text-lg font-semibold">
            Total de créditos: {getTotalCreditsApproved(coursesSelected)} / {getTotalProgramCredits(semesters)}
            </span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="mb-6 flex items-center justify-center gap-2">
        <Progress value={(getTotalCreditsApproved(coursesSelected) * 100) / getTotalProgramCredits(semesters)} className="w-[60%]" />
        <span className="text-muted-foreground">
          {Math.round((getTotalCreditsApproved(coursesSelected) * 100) / getTotalProgramCredits(semesters))}%
        </span>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {semesters.map((semester) => (
          <AccordionItem key={semester.number} value={`semester-${semester.number}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Semestre {semester.number}</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {getTotalCreditsBySemester(semester.courses)} créditos
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="p-4">
                  <div className="grid gap-4">
                    {semester.courses.map((course, index) => (
                      <div key={index} className={`flex items-center justify-between p-2 gap-4 cursor-pointer rounded-md hover:bg-accent transition-colors ${coursesSelected.includes(course) ? 'bg-accent' : ''}`}
                        onClick={() => selectCurse(course)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-6 flex items-center justify-center">
                            {coursesSelected.includes(course) 
                              ? <CheckCheck className="h-4 w-4 text-primary" />
                              : <Book className="h-4 w-4 text-primary" />
                            }
                          </div>
                          <span className="font-medium">{course.name}</span>
                        </div>
                        <span className="px-2 py-1 text-primary text-nowrap rounded-md text-sm bg-primary/10">
                          {course.credits} créditos
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <footer className="mt-8 text-center text-muted-foreground">
        <p className="text-sm">
          Created by Yorth21
        </p>
      </footer>
    </div>
  )
}

