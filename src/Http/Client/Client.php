<?php
namespace Concrete\Core\Http\Client;

use GuzzleHttp\Client as GuzzleHttpClient;

use Psr\Http\Message\RequestInterface;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerInterface;

class Client extends GuzzleHttpClient implements LoggerAwareInterface
{

    /**
     * @var GuzzleHttpClient
     */
    protected $client;

    /**
     * @var LoggerInterface|null
     */
    protected $logger = null;

    /**
     * Get the currently configured logger.
     *
     * @return LoggerInterface|null
     */
    public function getLogger()
    {
        return $this->logger;
    }

    /**
     * Set the currently configured logger.
     *
     * @param LoggerInterface|null $value
     *
     * @return static
     */
    public function setLogger(LoggerInterface $value = null)
    {
        $this->logger = $value;

        return $this;
    }


    public function send(RequestInterface $request, array $options = [])
    {
        $response = parent::send($request, $options);
        $logger = $this->getLogger();
        if ($logger !== null) {
            $statusCode = $response->getStatusCode();
            $body = $response->getBody();
            if (mb_strlen($body) <= 200) {
                $shortBody = $body;
            } else {
                $shortBody = mb_substr($body, 0, 197) . '...';
            }
            $logger->debug(
                'The response code was {statusCode} and the body was {shortBody}',
                [
                    'statusCode' => $statusCode,
                    'headers' => $response->getHeaders()->toArray(),
                    'shortBody' => $shortBody,
                    'body' => $body,
                ]
            );
        }
        return $response;
    }

    public function request($method, $uri = '', array $options = [])
    {
        $logger = $this->getLogger();
        if ($logger !== null) {
            $body = '';
            if (isset($options['body'])) {
                $body = $options['body'];
            }
            $uriString = (string) $uri;
            if (mb_strlen($body) <= 200) {
                $shortBody = (string) $body;
            } else {
                $shortBody = mb_substr($body, 0, 197) . '...';
            }
            $headers = null;
            if (isset($options['headers'])) {
                $headers = $options['headers'];
            }
            $logger->debug(
                'Sending {method} request to {uri} with body {shortBody}',
                [
                    'uri' => $uriString,
                    'method' => $method,
                    'headers' => is_array($headers) ? $headers : (array) $headers,
                    'shortBody' => $shortBody,
                    'body' => $body,
                ]
            );
        }
        return parent::request($method, $uri, $options);

    }

}
