package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.LinkedList;
import java.util.List;

@Slf4j
public class ClientHandler {
    private static int connections = 0;

    private String id;
    private ServerSocket serverSocket;
    private List<PrintWriter> writer;
    private List<String> messages;
    private final String prevMessagesEnd = "END - all previous Messages sent";

    public ClientHandler(String id) {
        try {
            this.serverSocket = new ServerSocket(0);
        } catch (IOException e) {
            log.error("GRRRRRRRRR cant create new ServerSocket", e);
        }
        this.id = id;
        this.writer = new LinkedList<>();
        this.messages = new LinkedList<>();
    }

    public int getPort() {
        return this.serverSocket.getLocalPort();
    }

    public String getId(){return this.id;}

    public void acceptNewSocket() {
        try {
            Socket client = this.serverSocket.accept();
            log.info(client + " - connected to Handler {}", this);
            connections++;

            PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(client.getOutputStream()));
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(client.getInputStream()));
            this.writer.add(printWriter);

            //TODO Thread maybe in different class for better readability
            new Thread(() -> {
                messages.forEach(s -> {
                    printWriter.println(s);
                    printWriter.flush();
                });
                printWriter.println(prevMessagesEnd);
                printWriter.flush();
                log.info("Handler sent previous Chat Messages to Client");

                while (true) {
                    try {
                        String readLine = bufferedReader.readLine();
                        this.writer.forEach(writer -> {
                            writer.println(readLine);
                            writer.flush();
                        });
                        messages.add(readLine);
                        log.info("Handler read in a message and broadcast it to {} clients", this.writer.size());
                    } catch (IOException e) {
                        log.error("Connection lost", e);
                        break;
                    }
                }

                try{
                    client.close();
                    bufferedReader.close();
                    this.writer.remove(printWriter);
                    printWriter.close();
                    connections--;
                }catch (IOException e){
                    log.error("Closing error", e);
                }
            }).start();
        } catch (IOException e) {
            log.error("AWWWW Man", e);
        }
    }

    public int getConnections(){
        return connections;
    }

    public void startUp() {
        log.info("A new Handler on port {} is starting up", this.serverSocket.getLocalPort());
    }
}