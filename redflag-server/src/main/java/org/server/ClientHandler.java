package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.LinkedList;
import java.util.List;

@Slf4j
public class ClientHandler {
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

    //TODO: not so good accept blocks, find solution JAn ;D Probably change to HTTP Requests should be not tooo hard i hope e
    public void acceptNewSocket() {
        try {
            Socket client = this.serverSocket.accept();
            this.writer.add(new PrintWriter(new OutputStreamWriter(client.getOutputStream())));
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(client.getInputStream()));
            new Thread(() -> {
                while (!client.isClosed()) {
                    try {
                        String readLine = bufferedReader.readLine();
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


}