package com.example.redflagguijavafx;

import javafx.scene.control.TextArea;

import java.io.*;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class Copy1203Distributor {
    private List<Copy1203ClientHandler> clientHandlers;
    private BufferedReader bufferedReader;
    private PrintWriter printWriter;
    private String id;
    private int port;

    private TextArea print;

    public Copy1203Distributor(TextArea print) {
        this.clientHandlers = new ArrayList<>();
        this.print = print;
    }

    public void add(Socket accepted) {
        //init reader/writer
        print.setText(print.getText() + "Distributor add flow started" + "\n");
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(accepted.getInputStream()));
            printWriter = new PrintWriter(new OutputStreamWriter(accepted.getOutputStream()));
        } catch (IOException e) {
            print.setText(print.getText() + "Whoopsie something went wrong :(" + "\n");
        }

        //default value -> if no port was found value is -1 -> maybe safety so no wrong port but idk
        port = -1;

        //wait for port request from Client
        try {
            print.setText(print.getText() + "Distributor waits for a Port/ID from the Client" + "\n");
            id = bufferedReader.readLine();
        } catch (IOException e) {
            print.setText(print.getText() + "Wrong Input" + "\n");
        }

        try{
            port = Integer.parseInt(id);
        }catch (NumberFormatException e){
            print.setText(print.getText() + "Distributor can not convert input to number" + "\n");
        }
        print.setText(print.getText() + "Distributor got " + id + " as ID and " + port + " as port" + "\n");

        print.setText(print.getText() + "Distributor checks if a ClientHandler with this Port/ID exists");

        Copy1203ClientHandler clientHandler = clientHandlers.stream()
                .filter(ch -> ch != null && (ch.getId().equals(id) || ch.getPort() == port))
                .findFirst()
                .orElse(null);

        if (clientHandler == null) {
            clientHandler = new Copy1203ClientHandler(print, id);
            clientHandler.startUp();
            clientHandlers.add(clientHandler);
            print.setText(print.getText() + "Port/ID wasn't found, so the Distributor started a new ClientHandler" + "\n");
        } else {
            print.setText(print.getText() + "Port/ID was found, the Distributor retrieves forwards the port back and tells the client-handler to wait for a new connection" + "\n");
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
            print.setText(print.getText() + "Closing Error in Distributor" + "\n");
        }

        clientHandler.acceptNewSocket();
    }

    public void cleanUpPorts(){
        this.clientHandlers = clientHandlers.stream()
                .filter(clientHandler -> clientHandler.getConnections() > 0)
                .toList();
    }
}