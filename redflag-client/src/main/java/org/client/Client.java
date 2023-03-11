package org.client;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.Socket;

@Slf4j
public class Client {
    private static final String ip = "127.0.0.1";
    private static final int port = 8080;

    private static Socket socket = null;
    private static PrintWriter write = null;
    private static BufferedReader read = null;

    private static String writing = null;
    private static String reading = null;
    private static int newPort;

    private static Reader reader = null;
    private static Writer writer = null;

    private static String user = null;

    public static void main(String[] args) {
        initialise();
        loop();
    }

    private static void initialise(){
        System.out.println("Username:");
        user = Input.readString();

        try {
            socket = new Socket(ip, port);

            read = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            write = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));

            System.out.println("Chat Port/ID:");//If port/id does not exist new ServerSocket is created
            writing = Input.readString();
            write.println(writing);
            write.flush();

            reading = read.readLine();
            if (!reading.equals("Success")) {
                log.error("Server Error");
                System.exit(-1);
            }

            reading = read.readLine();  //port
            newPort = Integer.parseInt(reading);
            reading = read.readLine();  //id

            socket.close();
            read.close();
            write.close();

            socket = new Socket(ip, newPort);
            reader = new Reader(socket, user);
            writer = new Writer(socket, user);
            System.out.println("Connected on " + reading + "/" + newPort);
        }catch (IOException e) {
            log.error("Client Initialise Error", e);
        }
    }

    private static void loop(){
        reader.start();

        try{
            do{
                System.out.println("\n\nChat Message: ");
                writing = Input.readString();
                writer.write(writing);
            }while(!writing.equals("exit"));

            reader.close();
            writer.close();
            socket.close();
        }catch (IOException e){
            log.error("Hoppala sollte nicht passieren", e);
        }
    }
}