'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Book, GraduationCap, Calendar, Award } from 'lucide-react'
import { ICourse } from '@/types/course'
import { ISemester } from '@/types/semester'
import { getSemesters } from '../services/semester'

export default function CourseManager() {
  const [semesters] = useState<ISemester[]>(getSemesters())

  const getTotalCredits = (courses: ICourse[]) => {
    return courses.reduce((total, course) => total + course.credits, 0)
  }

  const getTotalProgramCredits = (semesters: ISemester[]) => {
    return semesters.reduce((total, semester) => total + getTotalCredits(semester.courses), 0)
  }

  return (
    <div className="container max-w-2xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Materiapp</h1>
        <p className="text-muted-foreground">
          Gestiona tus materias y créditos por semestre
        </p>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <span>Resumen del Programa</span>
            </div>
            <span className="text-lg font-semibold">
              Total de créditos: {getTotalProgramCredits(semesters)}
            </span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {semesters.map((semester) => (
          <AccordionItem key={semester.number} value={`semester-${semester.number}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Semestre {semester.number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {getTotalCredits(semester.courses)} créditos
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="p-4">
                  <div className="grid gap-4">
                    {semester.courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                        <div className="flex items-center gap-3">
                          <Book className="h-4 w-4 text-primary" />
                          <span className="font-medium">{course.name}</span>
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
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
    </div>
  )
}

