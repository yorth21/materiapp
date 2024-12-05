import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 flex flex-col flex-nowrap gap-4">
      <h1 className="text-4xl font-bold">Materiapp</h1>
      <p className="text-lg">App para calcular el porcentaje de la carrera que llevas</p>
      <div className="">
      <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="I">I</TabsTrigger>
            <TabsTrigger value="II">II</TabsTrigger>
            <TabsTrigger value="III">III</TabsTrigger>
            <TabsTrigger value="IV">IV</TabsTrigger>
            <TabsTrigger value="V">V</TabsTrigger>
            <TabsTrigger value="VI">VI</TabsTrigger>
            <TabsTrigger value="VII">VII</TabsTrigger>
            <TabsTrigger value="VIII">VIII</TabsTrigger>
            <TabsTrigger value="IX">IX</TabsTrigger>
            <TabsTrigger value="X">X</TabsTrigger>
          </TabsList>
      
      <TabsContent value="I">
        <Card>
          <CardHeader>
            <CardTitle>Semestre 1</CardTitle>
          </CardHeader>
          <CardContent>
            
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="II">
        <Card>
          <CardHeader>
            <CardTitle>Semestre 2</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">

          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
      </div>
    </div>
  )
}
