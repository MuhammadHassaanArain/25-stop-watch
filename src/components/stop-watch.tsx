"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type LapTime = number;

function StopWatchComponent() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [lapTime, setLapTime] = useState<LapTime[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };
  const handleStop = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTime([]);
  };
  const handleLap = () => {
    setLapTime((prevlapTime) => [...prevlapTime, time]);
  };

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-5xl font-bold">Stopwatch</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Track your time with this stopwatch.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8 p-4">
          {/* Display the elapsed time */}
          <div className="text-8xl font-bold">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}.
            {milliseconds.toString().padStart(2, "0")}
          </div>
          {/* Buttons to control the stopwatch */}
          <div className="flex gap-4">
            <Button
              onClick={isRunning ? handleStop : handleStart}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              onClick={handleReset}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              Reset
            </Button>
            <Button
              onClick={handleLap}
              className="px-6 py-2 text-lg font-medium rounded-lg"
            >
              Lap
            </Button>
          </div>
          {/* Display the list of lap times */}
          <div className="w-full max-w-md">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-200">
                <CardTitle className="text-xl font-semibold">
                  Lap Times
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-auto p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Lap</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lapTime.map((lapTime, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-right">
                          {Math.floor(lapTime / 60000)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {Math.floor((lapTime % 60000) / 1000)
                            .toString()
                            .padStart(2, "0")}
                          :
                          {Math.floor((lapTime % 1000) / 10)
                            .toString()
                            .padStart(2, "0")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="font-bold justify-center text-center text-gray-700">
          Created by Hassaan Arain
        </CardFooter>
      </Card>
    </div>
  );
}
export default StopWatchComponent;
