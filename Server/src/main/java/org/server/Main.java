package org.server;


import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
@Slf4j
public class Main {
    private static final int port = 8080;

    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Socket accepted = null;



        try{
            serverSocket = new ServerSocket(port);
        }catch (IOException e){
            log.error("Can't create Server Socket");
            e.printStackTrace();
        }

        while(true){
            try{
                accepted = serverSocket.accept();
            }catch (IOException e){
                log.error("Can't handle Client");
                e.printStackTrace();
            }

            new Thread(new ClientHandler(accepted)).start();
        }
    }
}