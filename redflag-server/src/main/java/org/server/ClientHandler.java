package org.server;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

@Slf4j
public class ClientHandler extends Thread{
    private int port;

    private Socket server;
    private ServerSocket serverSocket;

    private BufferedReader read;
    private PrintWriter write;

    public ClientHandler(){
        try {
            this.serverSocket = new ServerSocket(0);
        } catch (IOException e) {
            log.error("GRRRRRRRRR cant create new ServerSocket", e);
        }

        this.port = this.serverSocket.getLocalPort();
    }

    public int getPort() {
        return this.port;
    }

    @Override
    public void run() {
        try {
            this.server = this.serverSocket.accept();

            this.read = new BufferedReader(new InputStreamReader(this.server.getInputStream()));
            this.write = new PrintWriter(new OutputStreamWriter(this.server.getOutputStream()));
        } catch (IOException e) {
            log.error("AWWWW Man", e);
        }

        while(!server.isClosed()){//TODO idk if right server.isConnected glaub funktioniert ned
            try{
                write.println(read.readLine());
                write.flush();
            }catch (IOException e){
                log.error("Client Server Error", e);
                break;
            }
        }

        try{
            server.close();
            read.close();
            write.close();
        }catch (IOException e){
            log.error("Closing Error", e);
        }
    }
}