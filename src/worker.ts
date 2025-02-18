export default interface IntervalWork {
  id: string;
  name: string;
  delay?: number;
}

export interface ScheduledIntervalWork {
  id: string;
  intervalId: NodeJS.Timer;
}

const scheduledIntervalWorks: ScheduledIntervalWork[] = [];

onmessage = (event) => {
  const intervalWork = event.data && (event.data as IntervalWork);
  if (!intervalWork) {
    return;
  }

  switch (intervalWork.name) {
    case "setInterval": {
      intervalWork.name = "runCallback";
      const intervalId = setInterval(() => {
        postMessage(intervalWork);
      }, intervalWork.delay);
      scheduledIntervalWorks.push({
        id: intervalWork.id,
        intervalId,
      });
      break;
    }
    case "clearInterval": {
      const workIndex = scheduledIntervalWorks.findIndex(
        (x) => x.id === intervalWork.id
      );
      if (workIndex >= 0) {
        clearInterval(scheduledIntervalWorks[workIndex].intervalId);
        scheduledIntervalWorks.splice(workIndex);
      }
      break;
    }
  }
};
