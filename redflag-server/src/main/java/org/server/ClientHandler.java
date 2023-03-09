package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.LinkedList;
import java.util.List;

@Slf4j
public class ClientHandler extends Thread {
    private int port;
    private ServerSocket serverSocket;
    private List<PrintWriter> writer;

    public ClientHandler() {
        try {
            this.serverSocket = new ServerSocket(0);
        } catch (IOException e) {
            log.error("GRRRRRRRRR cant create new ServerSocket", e);
        }
        this.writer = new LinkedList<>();
        this.port = this.serverSocket.getLocalPort();
    }

    public int getPort() {
        return this.port;
    }

    public void acceptNewSocket() {
        try {
            Socket client = this.serverSocket.accept();
            log.info(client + " - connected to Handler {}", this);
            this.writer.add(new PrintWriter(new OutputStreamWriter(client.getOutputStream())));
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(client.getInputStream()));
            new Thread(() -> {
                while (!client.isClosed()) {
                    try {
                        String readLine = bufferedReader.readLine();
                        log.info("Handler read in a message and broadcast it to {} clients", this.writer.size());
                        this.writer.forEach(writer -> {
                            writer.println(readLine);
                            writer.flush();
                        });
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
            }).start();
        } catch (IOException e) {
            log.error("AWWWW Man", e);
        }
    }

    @Override
    public void run() {
        log.info("A new Handler on port {} is starting up", this.port);
    }

}