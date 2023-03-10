package org.client;

import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

@Slf4j
public class Reader extends Thread {
    private final Socket socket;
    private BufferedReader read;
    private String reading;
    private boolean closed;
    private final String user;
    private final String prevMessagesEnd = "END - all previous Messages sent";

    public Reader(Socket socket, String user) {
        this.socket = socket;
        this.closed = false;
        this.user = user;

        try {
            read = new BufferedReader(new InputStreamReader(this.socket.getInputStream()));
        } catch (IOException e) {
            log.error("Reader Error - cant create BufferedReader", e);
        }

        //get previous Messages
        do{
            try{
                reading = read.readLine();
                System.out.println(reading.substring(reading.indexOf(":") + 1));
            }catch (IOException e){
                log.error("Error while reading previous Messages", e);
            }
        }while (!reading.equals(prevMessagesEnd));
        System.out.println("\n");
    }

    public void close() {
        try {
            closed = true;
            socket.close();
            read.close();
        } catch (IOException e) {
            log.error("Reader Error - closing error", e);
        }
    }

    @Override
    public void run() {
        while (!closed) {
            try {
                reading = read.readLine();
            } catch (IOException e) {
                log.error("Reader Error - reading error", e);
                break;
            }
            if (!reading.contains(Integer.toString(user.hashCode()))) {
                System.out.println(reading.substring(reading.indexOf(":") + 1));
            }
        }
    }
}