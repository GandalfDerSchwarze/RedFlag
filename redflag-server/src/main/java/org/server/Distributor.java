package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.Socket;
import java.util.Arrays;

@Slf4j
public class Distributor {
    ClientHandler[] clientHandlers;

    private BufferedReader read;
    private PrintWriter write;

    String reading;
    int port;

    public Distributor(int maxClients) {
        this.clientHandlers = new ClientHandler[maxClients];
    }

    public void add(Socket accepted) {
        try {
            read = new BufferedReader(new InputStreamReader(accepted.getInputStream()));
            write = new PrintWriter(new OutputStreamWriter(accepted.getOutputStream()));
        } catch (IOException e) {
            log.error("Whoopsie something went wrong :(", e);
        }

        port = -1;

        try {
            reading = read.readLine();
            port = Integer.parseInt(reading);
        } catch (IOException e) {
            log.error("Wrong Input", e);
        }

        boolean exists = false;
        for (ClientHandler ch : clientHandlers) {
            if (ch != null && ch.getPort() == port) {
                exists = true;
                ch.acceptNewSocket();
                break;
            }
        }

        if (!exists) {
            for (int i = 0; i < clientHandlers.length; i++) {
                if (clientHandlers[i] == null) {
                    clientHandlers[i] = new ClientHandler();
                    port = clientHandlers[i].getPort();
                    clientHandlers[i].acceptNewSocket();
                    break;
                }
            }
        }

        if (port >= 0 && port <= 65535) {
            write.println("Success");
            write.flush();
            write.println(port);
            write.flush();
        } else {
            write.println("Error");
            write.flush();
        }

        try {
            accepted.close();
            read.close();
            write.close();
        } catch (IOException e) {
            log.error("Closing Error in Distributor", e);
        }
    }
}