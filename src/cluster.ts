import cluster from 'cluster';
import { cpus, EOL } from 'os';
import { pid } from 'process';

const clusterServers = async (): Promise<void> => {
  if (cluster.isPrimary) {
    const numOfCpus = cpus().length;

    console.log(
      `Master process identifier is ${pid}${EOL}${numOfCpus} forks will be started`,
    );

    for (let i = 0; i < numOfCpus; i++) {
      cluster.fork();
    }

    return;
  }

  await import('./index');

  console.log(
    `Worker ${cluster.worker?.id}. Process identifier is ${pid}${EOL}`,
  );
};

clusterServers();
