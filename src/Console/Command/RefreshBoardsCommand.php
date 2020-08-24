<?php

namespace Concrete\Core\Console\Command;

use Concrete\Core\Application\Application;
use Concrete\Core\Board\Command\AddContentToBoardInstanceCommand;
use Concrete\Core\Board\Command\ClearBoardInstanceCommand;
use Concrete\Core\Board\Command\ClearBoardInstanceDataPoolCommand;
use Concrete\Core\Board\Command\GenerateBoardInstanceCommand;
use Concrete\Core\Board\Command\PopulateBoardInstanceDataPoolCommand;
use Concrete\Core\Board\Command\RefreshBoardInstanceCommand;
use Concrete\Core\Console\Command;
use Concrete\Core\Entity\Board\Board;
use Concrete\Core\Entity\Board\Instance;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class RefreshBoardsCommand extends Command
{
    protected function configure()
    {
        $errExitCode = static::RETURN_CODE_ON_FAILURE;

        $this
            ->setName('c5:boards:refresh')
            ->setDescription('Add content to boards and board instances.')
            ->addOption('--all',  'a',InputOption::VALUE_NONE,
    'Add content to all instances of all boards.')
            ->addOption('--regenerate',  'r',InputOption::VALUE_NONE,
                        'Regenerates boards entirely instead of just adding content. Does NOT clear pinned slots.')
            ->addArgument('boardID', InputArgument::OPTIONAL)
            ->setHelp(<<<EOT
This command will add content to specified boards or board instances.

  0 operation completed successfully
  {$errExitCode} errors occurred
EOT
            )
        ;
    }

    protected function refreshBoard(Application $app, EntityManager $em, Board $board)
    {
        $board = $em->merge($board);
        $this->output->writeln(t('Retrieving instances from board: %s', $board->getBoardName()));
        $instances = $board->getInstances();
        foreach($instances as $instance) {
            $this->refreshInstance($app, $instance);
        }
        $em->clear();
    }

    protected function refreshInstance(Application $app, Instance $instance)
    {
        if ($this->input->getOption('regenerate')) {
            $this->output->writeln(t('** Clearing board instance data pool: %s', $instance->getBoardInstanceName()));
            $command = new ClearBoardInstanceDataPoolCommand();
            $command->setInstance($instance);
            $app->executeCommand($command);

            $this->output->writeln(t('** Populating board instance data pool: %s', $instance->getBoardInstanceName()));
            $command = new PopulateBoardInstanceDataPoolCommand();
            $command->setInstance($instance);
            $app->executeCommand($command);

            $this->output->writeln(t('** Regenerating instance: %s', $instance->getBoardInstanceName()));
            $command = new ClearBoardInstanceCommand();
            $command->setInstance($instance);
            $app->executeCommand($command);

            $command = new GenerateBoardInstanceCommand();
            $command->setInstance($instance);
            $app->executeCommand($command);
        } else {
            $this->output->writeln(t('** Refreshing board instance: %s', $instance->getBoardInstanceName()));
            $command = new RefreshBoardInstanceCommand();
            $command->setInstance($instance);
            $app->executeCommand($command);

            $command = new AddContentToBoardInstanceCommand();
            $command->setInstance($instance);
            $app->executeCommand($command);
        }
    }

    public function handle(Application $app, EntityManager $em)
    {
        if ($this->input->getOption('all')) {
            $boards = $em->getRepository(Board::class)
                ->findAll();
            foreach($boards as $board) {
                $this->refreshBoard($app, $em, $board);
            }
        } else {
            $boardID = $this->input->getArgument('boardID');
            if ($boardID) {
                $board = $em->find(Board::class, $boardID);
                if ($board) {
                    $this->refreshBoard($app, $em, $board);
                } else {
                    throw new \Exception(t('Invalid board ID.'));
                }
            } else {
                throw new \Exception(t('You must specify a board ID or use the --all option.'));
            }
        }
        return 0;
    }
}
