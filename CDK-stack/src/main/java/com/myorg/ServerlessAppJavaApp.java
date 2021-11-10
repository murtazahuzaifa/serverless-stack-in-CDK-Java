package com.myorg;

import software.amazon.awscdk.App;

public final class ServerlessAppJavaApp {
    public static void main(final String[] args) {
        App app = new App();

        new ServerlessAppJavaStack(app, "ServerlessAppJavaStack");

        app.synth();
    }
}
