package org.server;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {
    private static final int port = 8080;

    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Socket accepted = null;

        try{
            serverSocket = new ServerSocket(port);
        }catch (IOException e){
            System.err.println("Can't create Server Socket");
            e.printStackTrace();
        }

        while(true){
            try{
                accepted = serverSocket.accept();
            }catch (IOException e){
                System.err.println("Can't handle Client");
                e.printStackTrace();
            }

            new Thread(new ClientHandler(accepted)).start();
        }

        //Dont forget
        //serverSocket.close();
    }
}