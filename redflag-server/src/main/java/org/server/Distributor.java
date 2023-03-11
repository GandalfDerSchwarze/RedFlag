package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class Distributor {
    private List<ClientHandler> clientHandlers;
    private BufferedReader bufferedReader;
    private PrintWriter printWriter;
    private String id;
    private int port;

    public Distributor() {
        this.clientHandlers = new ArrayList<>();
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

        //default value -> if no port was found value is -1 -> maybe safety so no wrong port but idk
        port = -1;

        //wait for port request from Client
        try {
            log.info("Distributor waits for a Port/ID from the Client");
            id = bufferedReader.readLine();
        } catch (IOException e) {
            log.error("Wrong Input", e);
        }

        try{
            port = Integer.parseInt(id);
        }catch (NumberFormatException e){
            log.info("Distributor can not convert input to number");
        }
        log.info("Distributor got {} as ID and {} as port", id, port);

        log.info("Distributor checks if a ClientHandler with this Port/ID exists");

        ClientHandler clientHandler = clientHandlers.stream()
                .filter(ch -> ch != null && (ch.getId().equals(id) || ch.getPort() == port))
                .findFirst()
                .orElse(null);

        if (clientHandler == null) {
            clientHandler = new ClientHandler(id);
            clientHandler.startUp();
            clientHandlers.add(clientHandler);
            log.info("Port/ID wasn't found, so the Distributor started a new ClientHandler");
        } else {
            log.info("Port/ID was found, the Distributor retrieves forwards the port back and tells the client-handler to wait for a new connection");
        }

        port = clientHandler.getPort();
        id = clientHandler.getId();

        if (port >= 0 && port <= 65535) {
            printWriter.println("Success");
            printWriter.flush();
            printWriter.println(port);
            printWriter.flush();
            printWriter.println(id);
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
        } catch (IOException e) {
            log.error("Closing Error in Distributor", e);
        }

        clientHandler.acceptNewSocket();
    }

    public void cleanUpPorts(){
        this.clientHandlers = clientHandlers.stream()
                .filter(clientHandler -> clientHandler.getConnections() > 0)
                .toList();
    }
}