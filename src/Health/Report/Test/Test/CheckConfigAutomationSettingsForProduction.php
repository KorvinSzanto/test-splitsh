<?php
namespace Concrete\Core\Health\Report\Test\Test;

use Concrete\Core\Config\Repository\Repository;
use Concrete\Core\Health\Report\Finding\SettingsLocation\Location\AutomationSettingsLocation;
use Concrete\Core\Health\Report\Runner;
use Concrete\Core\Health\Report\Test\TestInterface;

class CheckConfigAutomationSettingsForProduction implements TestInterface
{

    protected $config;

    public function __construct(Repository $config)
    {
        $this->config = $config;
    }

    public function run(Runner $report): void
    {
        if ($this->config->get('concrete.messenger.consume.method') === 'worker') {
            $report->success(
                'Message queue consumer configured to run via the command line.',
                new AutomationSettingsLocation()
            );
        } else {
            $report->info(
                'Consider configuring your queue messenger to run via the command line for better efficiency and performance.',
                new AutomationSettingsLocation()
            );
        }
	}

}
