package org.server;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

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
            System.err.println("GRRRRRRRRR cant create new ServerSocket");
            e.printStackTrace();
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
            System.err.println("AWWWW Man");
            e.printStackTrace();
        }

        while(!server.isClosed()){//TODO idk if right server.isConnected glaub funktioniert ned
            try{
                write.println(read.readLine());
                write.flush();
            }catch (IOException e){
                System.err.println("Client Server Error");
                e.printStackTrace();
                break;
            }
        }

        try{
            server.close();
            read.close();
            write.close();
        }catch (IOException e){
            System.err.println("Closing Error");
            e.printStackTrace();
        }
    }
}