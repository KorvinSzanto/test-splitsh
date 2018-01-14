<?php

namespace Concrete\Core\Updater\Migrations\Migrations;

use Concrete\Core\Updater\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20180114030029 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->refreshDatabaseTables([
            'OAuthServerAccessTokens',
            'OAuthServerAuthorizationCodes',
            'OAuthServerClients',
            'OAuthServerJti',
            'OAuthServerJwt',
            'OAuthServerPublicKeys',
            'OAuthServerRefreshTokens',
            'OAuthServerScopes',
            'OAuthServerUsers'
        ]);
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
