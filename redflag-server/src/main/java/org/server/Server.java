package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.ServerSocket;

@Slf4j
public class Server {
    private static final int PORT = 8080;

    public static void main(String[] args) {
        startup();
        Distributor distributor = new Distributor();

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            //TODO: think about an espace, that the server will stop
            log.info("Server started on Port: " + PORT);
            while (true) {
                log.info("Server starts listening for connection attempts");
                distributor.add(serverSocket.accept());

                log.info("Server cleanUp of Ports which are not used");
                distributor.cleanUpPorts();
            }
        } catch (IOException e) {
            log.error("ServerSocket Error", e);
        }
    }

    private static void startup() {
        log.info("\nServer is starting !" +
                "" +
                " \n __\n" +
                " \\  \\     _ _\n" +
                "  \\**\\ ___\\/ \\\n" +
                "X*#####*+^^\\_\\\n" +
                "  o/\\  \\\n" +
                "     \\__\\");
    }
}