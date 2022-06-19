import cluster, { Worker } from 'cluster';
import { cpus, EOL } from 'os';
import { pid } from 'process';

const clusterServers = async (): Promise<void> => {
  if (cluster.isPrimary) {
    const numberOfCpus = cpus().length;
    const workers: Worker[] = [];

    console.log(
      `Master process identifier is ${pid}${EOL}${numberOfCpus} forks will be started`,
    );

    for (let i = 0; i < numberOfCpus; i++) {
      const worker = cluster.fork();
      workers.push(worker);

      worker.on('message', ({ pid, users }) => {
        workers.forEach((worker) => {
          if (!worker.isDead() && worker.process.pid !== pid) {
            worker.send(users);
          }
        });
      });
    }

    return;
  }

  await import('./index');

  console.log(
    `Worker ${cluster.worker?.id}. Process identifier is ${pid}${EOL}`,
  );
};

clusterServers();
