<?php

namespace Concrete\Core\Automation\Process;

use Concrete\Core\Automation\Task\Input\InputInterface;
use Concrete\Core\Automation\Task\TaskService;
use Concrete\Core\Entity\Automation\Task;
use Doctrine\ORM\EntityManager;

/**
 * Methods useful for working with Process objects.
 */
class ProcessService
{

    /**
     * @var TaskService
     */
    protected $taskService;

    /**
     * @var EntityManager
     */
    protected $entityManager;

    public function __construct(TaskService $taskService, EntityManager $entityManager)
    {
        $this->taskService = $taskService;
        $this->entityManager = $entityManager;
    }

    public function createProcess(Task $task, InputInterface $input): Process
    {
        $this->taskService->start($task);

        $process = new Process();
        $process->setDateStarted($task->getDateLastStarted());
        $process->setInput($input);;
        $process->setTask($task);
        $process->setUser($task->getLastRunBy());

        $this->entityManager->persist($process);
        $this->entityManager->flush();

        return $process;
    }



}
