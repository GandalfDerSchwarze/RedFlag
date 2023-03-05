package org.server;

import java.io.*;
import java.net.ServerSocket;

public class Main {
    private static final int port = 8080;
    private static final int maxClients = 10;

    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Distributor distributor = new Distributor(maxClients);

        try{
            serverSocket = new ServerSocket(port);
        }catch (IOException e){
            System.err.println("Can't create Server Socket");
            e.printStackTrace();
        }

        while(true){
            try{
                distributor.add(serverSocket.accept());
            }catch (IOException e){
                System.err.println("Can't handle Client");
                e.printStackTrace();
            }
        }

        //Dont forget
        //serverSocket.close();
    }
}