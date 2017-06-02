<?php

    /*
    *	Config file: Local environment
    *
    */

    return array(
        'db' => array(
            'server' => 'localhost',
            'user' => 'user',
            'password' => 'password',
            'database' => 'database',
        ),
        'devMode' => false,
        'phpMaxMemoryLimit' => '256M',
        'backupDbOnUpdate' => true,
        'translationDebugOutput' => false,
        'useCompressedJs' => false,
        'enableTemplateCaching' => false,
        'userSessionDuration'           => 'P101Y',
        'rememberedUserSessionDuration' => 'P101Y',
        'rememberUsernameDuration'      => 'P101Y',
        'defaultCpLanguage' => 'en',
        'translationDebugOutput' => false,

        //'testToEmailAddress'  => 'tester@testingtesting123.com',

    );