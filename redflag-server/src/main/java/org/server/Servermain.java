package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.ServerSocket;

@Slf4j
public class Servermain {
    private static final int PORT = 8080;
    private static final int MAX_CLIENTS = 10;

    public static void main(String[] args) {
        startup();
        ServerSocket serverSocket = null;
        Distributor distributor = new Distributor(MAX_CLIENTS);

        try {
            serverSocket = new ServerSocket(PORT);
        } catch (IOException e) {
            log.error("Can't create Server Socket");
            e.printStackTrace();
        }

        while (true) {
            try {
                distributor.add(serverSocket.accept());
            } catch (IOException e) {
                log.error("Error on handling Client", e);
            }
        }

        //TODO: Dont forget
        //serverSocket.close();
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