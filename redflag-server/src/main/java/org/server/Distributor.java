package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
public class Distributor {
    List<ClientHandler> clientHandlers;
    private BufferedReader bufferedReader;
    private PrintWriter printWriter;
    String input;
    int port;
    int pos;

    public Distributor() {
        this.clientHandlers = new ArrayList<>();
        this.pos = 0;
    }

    public void add(Socket accepted) {
        //init reader/writer
        log.info("Distributor add flow started");
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(accepted.getInputStream()));
            printWriter = new PrintWriter(new OutputStreamWriter(accepted.getOutputStream()));
        } catch (IOException e) {
            log.error("Whoopsie something went wrong :(", e);
        }

        //wait for port request from Client
        try {
            log.info("Distributor waits for a Port from the Client");
            input = bufferedReader.readLine();
            port = Integer.parseInt(input);
            log.info("Distributor got {} as port", port);
        } catch (IOException e) {
            log.error("Wrong Input", e);
        }

        log.info("Distributor checks if a ClientHandler with this Port exists");

        ClientHandler clientHandler = clientHandlers.stream()
                .filter(ch -> ch != null && ch.getPort() == port)
                .findFirst()
                .orElse(null);

        if (clientHandler == null) {
            clientHandler = new ClientHandler();
            clientHandler.start();
            clientHandlers.add(clientHandler);
            log.info("Port wasn't found, so the Distributor started a new ClienHandler");
        } else {
            log.info("Port was found, the Distributor retrieves forwards the port back and tells the client-handler to wait for a new connection");
        }

        port = clientHandler.getPort();

        if (port >= 0 && port <= 65535) {
            printWriter.println("Success");
            printWriter.flush();
            printWriter.println(port);
            printWriter.flush();
        } else {
            printWriter.println("Error");
            printWriter.flush();
        }

        //close buffer & reset vars
        try {
            accepted.close();
            bufferedReader.close();
            printWriter.close();
            port = -1;
        } catch (IOException e) {
            log.error("Closing Error in Distributor", e);
        }

        clientHandler.acceptNewSocket();
    }
}